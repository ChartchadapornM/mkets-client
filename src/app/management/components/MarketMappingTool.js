import React, { useState, useRef } from 'react'

const MarketMappingTool = () => {
  const [boxes, setBoxes] = useState([])
  const [currentBox, setCurrentBox] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [showBoxForm, setShowBoxForm] = useState(false)
  const [newBoxName, setNewBoxName] = useState('')
  const [newBoxColor, setNewBoxColor] = useState('#3498db')
  const [mode, setMode] = useState('edit') // 'edit' or 'view'
  const [selectedBox, setSelectedBox] = useState(null)
  const [newShopName, setNewShopName] = useState('')
  const [newShopDescription, setNewShopDescription] = useState('')
  const mapRef = useRef(null)

  // Colors for boxes
  const boxColors = [
    '#3498db', // Blue
    '#e74c3c', // Red
    '#2ecc71', // Green
    '#f39c12', // Orange
    '#9b59b6', // Purple
    '#1abc9c', // Teal
    '#e67e22', // Dark Orange
    '#34495e', // Navy Blue
  ]

  const handleAddBox = () => {
    if (newBoxName.trim() === '') return

    const newBox = {
      id: Date.now(),
      name: newBoxName,
      color: newBoxColor,
      position: { x: 50, y: 50 },
      size: { width: 100, height: 100 },
      shops: [], // Array to store shops in this box
    }

    setBoxes([...boxes, newBox])
    setNewBoxName('')
    setShowBoxForm(false)
  }

  const addShopToBox = (boxId) => {
    if (newShopName.trim() === '') return

    const newShop = {
      id: Date.now(),
      name: newShopName,
      description: newShopDescription,
    }

    setBoxes(
      boxes.map((box) =>
        box.id === boxId ? { ...box, shops: [...box.shops, newShop] } : box
      )
    )

    setNewShopName('')
    setNewShopDescription('')
  }

  const removeShopFromBox = (boxId, shopId) => {
    setBoxes(
      boxes.map((box) =>
        box.id === boxId
          ? { ...box, shops: box.shops.filter((shop) => shop.id !== shopId) }
          : box
      )
    )
  }

  const handleMouseDown = (e, box) => {
    if (mode === 'view') {
      // In view mode, clicking selects the box to show details
      setSelectedBox(box)
      return
    }

    // In edit mode, handle dragging
    e.stopPropagation()
    setCurrentBox(box)
    setIsDragging(true)

    const rect = e.target.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseMove = (e) => {
    if (mode === 'view' || !isDragging || !currentBox) return

    const mapRect = mapRef.current.getBoundingClientRect()

    // Calculate new position
    let newX = e.clientX - mapRect.left - dragOffset.x
    let newY = e.clientY - mapRect.top - dragOffset.y

    // Keep the box within bounds
    newX = Math.max(0, Math.min(newX, mapRect.width - currentBox.size.width))
    newY = Math.max(0, Math.min(newY, mapRect.height - currentBox.size.height))

    // Update boxes
    setBoxes(
      boxes.map((box) =>
        box.id === currentBox.id
          ? { ...box, position: { x: newX, y: newY } }
          : box
      )
    )
  }

  const handleMouseUp = () => {
    if (mode === 'edit') {
      setIsDragging(false)
      setCurrentBox(null)
    }
  }

  const handleBoxClick = (box) => {
    if (mode === 'view') {
      setSelectedBox(box)
    }
  }

  const deleteBox = (id, e) => {
    e.stopPropagation()
    setBoxes(boxes.filter((box) => box.id !== id))
    if (selectedBox && selectedBox.id === id) {
      setSelectedBox(null)
    }
  }

  const resizeBox = (id, deltaWidth, deltaHeight, e) => {
    e.stopPropagation()
    setBoxes(
      boxes.map((box) =>
        box.id === id
          ? {
              ...box,
              size: {
                width: Math.max(50, box.size.width + deltaWidth),
                height: Math.max(50, box.size.height + deltaHeight),
              },
            }
          : box
      )
    )
  }

  // Clear selected box when clicking on empty space
  const handleMapClick = (e) => {
    if (e.target === mapRef.current) {
      setSelectedBox(null)
    }
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="bg-gray-100 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Market Mapping Tool</h1>
        <div className="flex gap-2 items-center">
          {/* Mode toggle buttons */}
          <div className="flex bg-gray-200 rounded-lg p-1 mr-4">
            <button
              className={`px-3 py-1 rounded-md transition ${
                mode === 'edit' ? 'bg-blue-500 text-white' : 'text-gray-700'
              }`}
              onClick={() => {
                setMode('edit')
                setSelectedBox(null)
              }}
            >
              Edit Mode
            </button>
            <button
              className={`px-3 py-1 rounded-md transition ${
                mode === 'view' ? 'bg-blue-500 text-white' : 'text-gray-700'
              }`}
              onClick={() => {
                setMode('view')
                setIsDragging(false)
                setCurrentBox(null)
              }}
            >
              View Mode
            </button>
          </div>

          {/* Add Box button - only visible in edit mode */}
          {mode === 'edit' && !showBoxForm && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setShowBoxForm(true)}
            >
              Add Box
            </button>
          )}

          {/* Box form - only visible in edit mode */}
          {mode === 'edit' && showBoxForm && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Box name"
                className="border rounded px-2 py-1"
                value={newBoxName}
                onChange={(e) => setNewBoxName(e.target.value)}
              />
              <select
                className="border rounded px-2 py-1"
                value={newBoxColor}
                onChange={(e) => setNewBoxColor(e.target.value)}
              >
                {boxColors.map((color) => (
                  <option key={color} value={color}>
                    {color === '#3498db'
                      ? 'Blue'
                      : color === '#e74c3c'
                        ? 'Red'
                        : color === '#2ecc71'
                          ? 'Green'
                          : color === '#f39c12'
                            ? 'Orange'
                            : color === '#9b59b6'
                              ? 'Purple'
                              : color === '#1abc9c'
                                ? 'Teal'
                                : color === '#e67e22'
                                  ? 'Dark Orange'
                                  : 'Navy Blue'}
                  </option>
                ))}
              </select>
              <button
                className="bg-green-500 text-white px-2 py-1 rounded"
                onClick={handleAddBox}
              >
                Add
              </button>
              <button
                className="bg-gray-400 text-white px-2 py-1 rounded"
                onClick={() => setShowBoxForm(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        ref={mapRef}
        className="flex-1 relative bg-white border-2 border-gray-200 overflow-hidden"
        style={{ minHeight: '500px' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleMapClick}
      >
        {/* Market Map Area */}
        <div className="relative w-full h-full">
          {boxes.map((box) => (
            <div
              key={box.id}
              className={`absolute shadow-md rounded flex flex-col ${
                mode === 'edit' ? 'cursor-move' : 'cursor-pointer'
              }`}
              style={{
                left: `${box.position.x}px`,
                top: `${box.position.y}px`,
                width: `${box.size.width}px`,
                height: `${box.size.height}px`,
                backgroundColor: box.color,
                opacity: 0.8,
                border: `2px solid ${box.color
                  .replace(')', ', 0.8)')
                  .replace('rgb', 'rgba')}`,
                zIndex:
                  (currentBox && currentBox.id === box.id) ||
                  (selectedBox && selectedBox.id === box.id)
                    ? 10
                    : 1,
                borderWidth:
                  selectedBox && selectedBox.id === box.id ? '3px' : '2px',
              }}
              onMouseDown={(e) => handleMouseDown(e, box)}
              onClick={() => handleBoxClick(box)}
            >
              <div className="p-2 text-white font-medium truncate flex-1 flex flex-col justify-center items-center">
                <span className="text-center">{box.name}</span>
                {box.shops && box.shops.length > 0 && (
                  <span className="text-xs mt-1">
                    {box.shops.length} shop{box.shops.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {/* Edit mode controls */}
              {mode === 'edit' && (
                <>
                  {/* Resize handles */}
                  <div
                    className="absolute bottom-0 right-0 w-4 h-4 bg-white cursor-se-resize rounded-sm"
                    onMouseDown={(e) => {
                      e.stopPropagation()
                      const startX = e.clientX
                      const startY = e.clientY

                      const handleResize = (moveEvent) => {
                        const deltaX = moveEvent.clientX - startX
                        const deltaY = moveEvent.clientY - startY
                        resizeBox(box.id, deltaX, deltaY, e)
                      }

                      const removeListeners = () => {
                        window.removeEventListener('mousemove', handleResize)
                        window.removeEventListener('mouseup', removeListeners)
                      }

                      window.addEventListener('mousemove', handleResize)
                      window.addEventListener('mouseup', removeListeners)
                    }}
                  />

                  {/* Delete button */}
                  <button
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs"
                    onClick={(e) => deleteBox(box.id, e)}
                  >
                    ×
                  </button>
                </>
              )}
            </div>
          ))}

          {boxes.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-400">
              {mode === 'edit'
                ? 'Click "Add Box" to start creating your market map'
                : 'No market segments available. Switch to Edit mode to create some.'}
            </div>
          )}
        </div>

        {/* Details Panel - shows when a box is selected in view mode */}
        {mode === 'view' && selectedBox && (
          <div className="absolute top-0 right-0 w-64 h-full bg-white border-l border-gray-200 p-4 overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2
                className="text-lg font-bold"
                style={{ color: selectedBox.color }}
              >
                {selectedBox.name}
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedBox(null)}
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Shops in this area:</h3>
              {selectedBox.shops && selectedBox.shops.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {selectedBox.shops.map((shop) => (
                    <li key={shop.id} className="py-2">
                      <h4 className="font-medium">{shop.name}</h4>
                      <p className="text-sm text-gray-600">
                        {shop.description}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  No shops in this area yet.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Panel - Shop Management or Instructions */}
      <div className="bg-gray-100 p-4">
        {mode === 'edit' && selectedBox ? (
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Manage Shops in {selectedBox.name}
            </h2>

            {/* Form to add shops */}
            <div className="bg-white p-3 rounded mb-3">
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">
                  Shop Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={newShopName}
                  onChange={(e) => setNewShopName(e.target.value)}
                  placeholder="Enter shop name"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  className="w-full border rounded px-2 py-1"
                  value={newShopDescription}
                  onChange={(e) => setNewShopDescription(e.target.value)}
                  placeholder="Enter shop description"
                  rows="3"
                />
              </div>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => addShopToBox(selectedBox.id)}
              >
                Add Shop
              </button>
            </div>

            {/* List of existing shops */}
            <h3 className="font-medium mb-2">Existing Shops:</h3>
            {selectedBox.shops && selectedBox.shops.length > 0 ? (
              <ul className="bg-white rounded divide-y divide-gray-200">
                {selectedBox.shops.map((shop) => (
                  <li
                    key={shop.id}
                    className="p-2 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-medium">{shop.name}</h4>
                      <p className="text-xs text-gray-600 truncate">
                        {shop.description}
                      </p>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeShopFromBox(selectedBox.id, shop.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No shops added yet.</p>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-2">Instructions:</h2>
            <ul className="text-sm text-gray-700 list-disc pl-5">
              {mode === 'edit' ? (
                <>
                  <li>Click "Add Box" to create a new market segment</li>
                  <li>Drag boxes to position them on the map</li>
                  <li>Use the bottom-right corner to resize boxes</li>
                  <li>Click the × button to delete a box</li>
                  <li>Click on a box to add shops to it</li>
                  <li>Switch to "View Mode" to explore your market</li>
                </>
              ) : (
                <>
                  <li>Click on a box to view details and shops in that area</li>
                  <li>
                    Switch to "Edit Mode" to make changes to your market map
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default MarketMappingTool
