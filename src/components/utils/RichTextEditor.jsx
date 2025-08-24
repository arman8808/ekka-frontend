// src/components/RichTextEditor.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize editor content only once
  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      editorRef.current.innerHTML = value || "";
      setIsInitialized(true);
    }
  }, [value, isInitialized]);

  // Handle input changes
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const htmlContent = editorRef.current.innerHTML;
      console.log('RichTextEditor HTML Content:', htmlContent);
      console.log('RichTextEditor Raw Content:', editorRef.current.textContent);
      onChange(htmlContent);
      // Force re-render to update toolbar state
      setIsFocused(prev => prev);
    }
  }, [onChange]);

  // Handle formatting commands
  const handleFormat = useCallback((command, value = null) => {
    if (editorRef.current) {
      // Focus the editor first
      editorRef.current.focus();
      
      // Use modern Selection API instead of deprecated execCommand
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        
        switch (command) {
          case 'bold':
            document.execCommand('bold', false, null);
            break;
          case 'italic':
            document.execCommand('italic', false, null);
            break;
          case 'underline':
            document.execCommand('underline', false, null);
            break;
          case 'insertUnorderedList':
            // Check if we're already in a list
            if (range.commonAncestorContainer.nodeName === 'LI' || 
                range.commonAncestorContainer.parentElement?.nodeName === 'LI') {
              // If already in a list, create a new list item
              document.execCommand('insertParagraph', false, null);
            } else {
              // Create a new unordered list
              document.execCommand('insertUnorderedList', false, null);
            }
            break;
          case 'insertOrderedList':
            // Check if we're already in a list
            if (range.commonAncestorContainer.nodeName === 'LI' || 
                range.commonAncestorContainer.parentElement?.nodeName === 'LI') {
              // If already in a list, create a new list item
              document.execCommand('insertParagraph', false, null);
            } else {
              // Create a new ordered list
              document.execCommand('insertOrderedList', false, null);
            }
            break;
          case 'formatBlock':
            document.execCommand('formatBlock', false, value);
            break;
          default:
            document.execCommand(command, false, value);
        }
        
        // Trigger input event to update parent component
        handleInput();
      } else {
        // If no selection, create a range at the end of the editor
        const range = document.createRange();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        
        // Now apply the command
        switch (command) {
          case 'insertUnorderedList':
            document.execCommand('insertUnorderedList', false, null);
            break;
          case 'insertOrderedList':
            document.execCommand('insertOrderedList', false, null);
            break;
          default:
    document.execCommand(command, false, value);
        }
    handleInput();
      }
    }
  }, [handleInput]);

  // Helper function to create a proper list
  const createList = useCallback((isOrdered = false) => {
    if (editorRef.current) {
    editorRef.current.focus();
      
      console.log('Creating list, isOrdered:', isOrdered);
      console.log('Current editor content before list:', editorRef.current.innerHTML);
      
      // Create a new list element
      const listElement = document.createElement(isOrdered ? 'ol' : 'ul');
      const listItem = document.createElement('li');
      
      // Add some content to the list item
      listItem.innerHTML = 'Type your list item here';
      
      // Append to list
      listElement.appendChild(listItem);
      
      console.log('Created list element:', listElement.outerHTML);
      
      // Insert at current cursor position or at the end
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        
        // Check if we're in a paragraph, if so, replace it
        if (range.commonAncestorContainer.nodeName === 'P' || 
            range.commonAncestorContainer.parentElement?.nodeName === 'P') {
          const paragraph = range.commonAncestorContainer.nodeName === 'P' ? 
            range.commonAncestorContainer : range.commonAncestorContainer.parentElement;
          
          if (paragraph && paragraph.textContent.trim() === '') {
            // Replace empty paragraph with list
            paragraph.parentNode.replaceChild(listElement, paragraph);
          } else {
            // Insert list after paragraph
            paragraph.parentNode.insertBefore(listElement, paragraph.nextSibling);
          }
        } else {
          // Insert at current position
          range.deleteContents();
          range.insertNode(listElement);
        }
        
        // Set cursor to list item
        range.setStart(listItem, 0);
        range.setEnd(listItem, 0);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        // Insert at the end
        editorRef.current.appendChild(listElement);
        const newRange = document.createRange();
        newRange.setStart(listItem, 0);
        newRange.setEnd(listItem, 0);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
      
      console.log('Editor content after list creation:', editorRef.current.innerHTML);
      
      handleInput();
    }
  }, [handleInput]);

  // Handle paste to clean HTML
  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  // Handle key events with shortcuts
  const handleKeyDown = useCallback((e) => {
    // Handle Enter key for new lines
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Check if we're in a list
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const listItem = range.commonAncestorContainer.nodeName === 'LI' ? 
          range.commonAncestorContainer : 
          range.commonAncestorContainer.parentElement?.nodeName === 'LI' ? 
          range.commonAncestorContainer.parentElement : null;
        
        if (listItem) {
          // We're in a list, create a new list item
          const newListItem = document.createElement('li');
          newListItem.innerHTML = 'Type your list item here';
          
          // Insert after current list item
          if (listItem.nextSibling) {
            listItem.parentNode.insertBefore(newListItem, listItem.nextSibling);
          } else {
            listItem.parentNode.appendChild(newListItem);
          }
          
          // Set cursor to new list item
          const newRange = document.createRange();
          newRange.setStart(newListItem, 0);
          newRange.setEnd(newListItem, 0);
          selection.removeAllRanges();
          selection.addRange(newRange);
        } else {
          // Not in a list, create a regular paragraph
          document.execCommand('insertParagraph', false, null);
        }
        
        // Trigger input event
        handleInput();
        return;
      } else {
        // No selection, just insert paragraph
        document.execCommand('insertParagraph', false, null);
      }
      
      // Trigger input event
      handleInput();
      return;
    }

    // Handle Backspace key for list management
    if (e.key === 'Backspace') {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const listItem = range.commonAncestorContainer.nodeName === 'LI' ? 
          range.commonAncestorContainer : 
          range.commonAncestorContainer.parentElement?.nodeName === 'LI' ? 
          range.commonAncestorContainer.parentElement : null;
        
        if (listItem && listItem.textContent.trim() === '') {
          // If list item is empty and we're at the beginning, remove it
          if (range.startOffset === 0) {
            e.preventDefault();
            
            // Remove the empty list item
            listItem.remove();
            
            // If this was the last list item, remove the list wrapper
            const list = listItem.parentNode;
            if (list && (list.nodeName === 'UL' || list.nodeName === 'OL')) {
              if (list.children.length === 0) {
                list.remove();
              }
            }
            
            // Create a new paragraph
            const newParagraph = document.createElement('p');
            newParagraph.innerHTML = '<br>';
            
            // Insert the paragraph where the list was
            if (list && list.parentNode) {
              list.parentNode.insertBefore(newParagraph, list);
            } else {
              editorRef.current.appendChild(newParagraph);
            }
            
            // Set cursor to new paragraph
            const newRange = document.createRange();
            newRange.setStart(newParagraph, 0);
            newRange.setEnd(newParagraph, 0);
            selection.removeAllRanges();
            selection.addRange(newRange);
            
            handleInput();
            return;
          }
        }
      }
    }

    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          handleFormat('bold');
          break;
        case 'i':
          e.preventDefault();
          handleFormat('italic');
          break;
        case 'u':
          e.preventDefault();
          handleFormat('underline');
          break;
        case 'l':
          e.preventDefault();
          createList(false);
          break;
        case 'o':
          e.preventDefault();
          createList(true);
          break;
      }
    }
  }, [handleFormat, createList, handleInput]);

  // Handle focus and blur
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    
    // Ensure there's always a selection in the editor
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection.rangeCount === 0) {
        const range = document.createRange();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  // Handle click on toolbar buttons
  const handleToolbarClick = useCallback((command, value = null) => {
    handleFormat(command, value);
  }, [handleFormat]);

  // Check if cursor is currently in a list
  const isInList = useCallback(() => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      return range.commonAncestorContainer.nodeName === 'LI' || 
             range.commonAncestorContainer.parentElement?.nodeName === 'LI';
    }
    return false;
  }, []);

  // Check if cursor is in an ordered list
  const isInOrderedList = useCallback(() => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const listItem = range.commonAncestorContainer.nodeName === 'LI' ? 
        range.commonAncestorContainer : 
        range.commonAncestorContainer.parentElement?.nodeName === 'LI' ? 
        range.commonAncestorContainer.parentElement : null;
      
      if (listItem && listItem.parentNode) {
        return listItem.parentNode.nodeName === 'OL';
      }
    }
    return false;
  }, []);

  // Check if cursor is in an unordered list
  const isInUnorderedList = useCallback(() => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const listItem = range.commonAncestorContainer.nodeName === 'LI' ? 
        range.commonAncestorContainer : 
        range.commonAncestorContainer.parentElement?.nodeName === 'LI' ? 
        range.commonAncestorContainer.parentElement : null;
      
      if (listItem && listItem.parentNode) {
        return listItem.parentNode.nodeName === 'UL';
      }
    }
    return false;
  }, []);

  return (
    <div className="border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#6E2D79] focus-within:border-[#6E2D79]">
      {/* Custom CSS for lists */}
      <style jsx>{`
        [contenteditable] ul {
          list-style-type: disc;
          margin-left: 20px;
          margin-top: 8px;
          margin-bottom: 8px;
        }
        [contenteditable] ol {
          list-style-type: decimal;
          margin-left: 20px;
          margin-top: 8px;
          margin-bottom: 8px;
        }
        [contenteditable] li {
          margin-bottom: 4px;
          padding-left: 4px;
        }
        [contenteditable] p {
          margin-bottom: 8px;
        }
      `}</style>
      
      {/* Toolbar */}
      <div className="flex flex-wrap border-b border-gray-200 p-2 bg-gray-50 rounded-t-lg gap-1">
        <button
          type="button"
          onClick={() => handleToolbarClick("bold")}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
          title="Bold (Ctrl+B)"
        >
          <span className="font-bold text-sm">B</span>
        </button>
        <button
          type="button"
          onClick={() => handleToolbarClick("italic")}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
          title="Italic (Ctrl+I)"
        >
          <span className="italic text-sm">I</span>
        </button>
        <button
          type="button"
          onClick={() => handleToolbarClick("underline")}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
          title="Underline (Ctrl+U)"
        >
          <span className="underline text-sm">U</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => createList(false)}
          className={`p-2 rounded transition-colors ${
            isInUnorderedList() 
              ? 'bg-[#6E2D79] text-white' 
              : 'hover:bg-gray-200'
          }`}
          title="Bullet List (Ctrl+L)"
        >
          <span className="text-lg">•</span>
        </button>
        <button
          type="button"
          onClick={() => createList(true)}
          className={`p-2 rounded transition-colors ${
            isInOrderedList() 
              ? 'bg-[#6E2D79] text-white' 
              : 'hover:bg-gray-200'
          }`}
          title="Numbered List (Ctrl+O)"
        >
          <span className="text-sm font-medium">1.</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => handleToolbarClick("formatBlock", "<p>")}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
          title="Paragraph"
        >
          <span className="text-sm font-medium">P</span>
        </button>
        <button
          type="button"
          onClick={() => handleToolbarClick("formatBlock", "<h3>")}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
          title="Heading"
        >
          <span className="text-sm font-medium">H</span>
        </button>
      </div>
      
      {/* Editor Area */}
      <div className="relative">
      <div
        ref={editorRef}
        contentEditable
          className="min-h-[150px] p-4 rounded-b-lg bg-white overflow-y-auto focus:outline-none"
          style={{
            lineHeight: '1.6',
            fontSize: '14px'
          }}
        onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          onClick={handleFocus}
          suppressContentEditableWarning={true}
        />
        
        {/* Placeholder */}
        {(!value || value === '<p><br></p>' || value === '') && !isFocused && (
          <div className="absolute top-4 left-4 text-gray-400 pointer-events-none select-none">
          {placeholder}
        </div>
      )}
      </div>
    </div>
  );
};

export default RichTextEditor;