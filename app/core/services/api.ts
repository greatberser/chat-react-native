const BASE_URL = 'https://6687bd470bc7155dc018e51b.mockapi.io/chats';

export const getChats = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch chats');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

export const createChat = async (name: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error('Failed to create chat');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

export const deleteChat = async (chatId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${chatId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete chat');
    }
    return true;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

export const updateChat = async (chatId: string, newName: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${chatId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName }),
    });
    if (!response.ok) {
      throw new Error('Failed to update chat');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};
