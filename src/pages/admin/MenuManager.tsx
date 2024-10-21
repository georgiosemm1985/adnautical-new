import React, { useState, useEffect } from 'react';
// @ts-ignore
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useMenuItems, useUpdateMenuItems } from '../../hooks/useMenuItems';
import { usePages } from '../../hooks/usePages';
import { useArticles } from '../../hooks/useArticles';
import { useNotification } from '../../context/NotificationContext';

interface MenuItem {
  id: string;
  type: 'page' | 'article' | 'custom';
  label: string;
  url: string;
}

const MenuManager: React.FC = () => {
  const { data: menuItems, isLoading, isError } = useMenuItems();
  const updateMenuItems = useUpdateMenuItems();
  const { data: pages } = usePages();
  const { data: articles } = useArticles();
  const { addNotification } = useNotification();
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (menuItems) {
      setItems(menuItems);
    }
  }, [menuItems]);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
    updateMenuItems.mutate(newItems, {
      onSuccess: () => {
        addNotification('Menu order updated successfully', 'success');
      },
      onError: () => {
        addNotification('Failed to update menu order', 'error');
      },
    });
  };

  const addMenuItem = (type: 'page' | 'article' | 'custom', id: string) => {
    let newItem: MenuItem;

    if (type === 'page') {
      const page = pages?.find(p => p.id === id);
      newItem = { id: `page-${id}`, type, label: page?.title || '', url: `/page/${id}` };
    } else if (type === 'article') {
      const article = articles?.find(a => a.id === parseInt(id));
      newItem = { id: `article-${id}`, type, label: article?.title || '', url: `/blog/${id}` };
    } else {
      newItem = { id: `custom-${Date.now()}`, type, label: 'New Link', url: '' };
    }

    const newItems = [...items, newItem];
    setItems(newItems);
    updateMenuItems.mutate(newItems, {
      onSuccess: () => {
        addNotification('Menu item added successfully', 'success');
      },
      onError: () => {
        addNotification('Failed to add menu item', 'error');
      },
    });
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    setItems(newItems);
    updateMenuItems.mutate(newItems, {
      onSuccess: () => {
        addNotification('Menu item updated successfully', 'success');
      },
      onError: () => {
        addNotification('Failed to update menu item', 'error');
      },
    });
  };

  const removeMenuItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    updateMenuItems.mutate(newItems, {
      onSuccess: () => {
        addNotification('Menu item removed successfully', 'success');
      },
      onError: () => {
        addNotification('Failed to remove menu item', 'error');
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading menu items</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Menu Manager</h2>
      
      <div className="flex space-x-4">
        <select
          onChange={(e) => addMenuItem('page', e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Add Page</option>
          {pages?.map(page => (
            <option key={page.id} value={page.id}>{page.title}</option>
          ))}
        </select>
        <select
          onChange={(e) => addMenuItem('article', e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Add Article</option>
          {articles?.map(article => (
            <option key={article.id} value={article.id}>{article.title}</option>
          ))}
        </select>
        <button
          onClick={() => addMenuItem('custom', '')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Custom Link
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="menu-items">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center space-x-2 bg-white p-2 rounded shadow"
                    >
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => updateMenuItem(item.id, { label: e.target.value })}
                        className="border rounded px-2 py-1"
                      />
                      {item.type === 'custom' && (
                        <input
                          type="text"
                          value={item.url}
                          onChange={(e) => updateMenuItem(item.id, { url: e.target.value })}
                          className="border rounded px-2 py-1"
                          placeholder="URL"
                        />
                      )}
                      <button
                        onClick={() => removeMenuItem(item.id)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default MenuManager;