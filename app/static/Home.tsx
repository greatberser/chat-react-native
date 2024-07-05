import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button, Input } from '../shared';
import {
  getChats,
  createChat,
  deleteChat,
  updateChat,
} from '../core/services/api';

interface Chat {
  id: string;
  name: string;
  avatar?: string;
}

const DEFAULT_AVATAR = 'https://via.placeholder.com/50';

export default function Home() {
  const navigation = useNavigation();
  const [chats, setChats] = useState<Chat[]>([]);
  const [newChatName, setNewChatName] = useState('');
  const [searchText, setSearchText] = useState('');
  const [updatingChatId, setUpdatingChatId] = useState<string | null>(null);
  const [updatedChatName, setUpdatedChatName] = useState('');

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const fetchedChats = await getChats();
      setChats(fetchedChats);
    } catch (error) {
      console.error('Failed to fetch chats:', error.message);
    }
  };

  const handleCreateChat = async () => {
    if (newChatName.trim() === '') return;

    try {
      const newChat = await createChat(newChatName);
      setChats([...chats, newChat]);
      setNewChatName('');
    } catch (error) {
      console.error('Failed to create chat:', error.message);
    }
  };

  const handleDeleteChat = async (id: string) => {
    try {
      await deleteChat(id);
      const updatedChats = chats.filter((chat) => chat.id !== id);
      setChats(updatedChats);
    } catch (error) {
      console.error('Failed to delete chat:', error.message);
    }
  };

  const handleUpdateChat = async (id: string, newName: string) => {
    try {
      const updatedChat = await updateChat(id, newName);
      const updatedChats = chats.map((chat) =>
        chat.id === id ? { ...chat, name: updatedChat.name } : chat
      );
      setChats(updatedChats);
      setUpdatingChatId(null);
    } catch (error) {
      console.error('Failed to update chat:', error.message);
    }
  };

  const filteredChats = chats.filter(
    (chat) =>
      chat.name &&
      typeof chat.name === 'string' &&
      chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat List</Text>
      <Input
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search chats"
      />
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (!updatingChatId) {
                navigation.navigate('Chat', {
                  chatId: item.id,
                  chatName: item.name,
                  chatAvatar: item.avatar || DEFAULT_AVATAR,
                });
              }
            }}
            activeOpacity={1}
          >
            <View style={styles.chatItem}>
              <View style={styles.chatContent}>
                <Avatar
                  uri={item.avatar || DEFAULT_AVATAR}
                  style={styles.avatar}
                />
                {updatingChatId === item.id ? (
                  <Input
                    style={styles.input}
                    value={updatedChatName}
                    onChangeText={setUpdatedChatName}
                    placeholder="Enter new name"
                  />
                ) : (
                  <Text numberOfLines={2} style={styles.chatName}>
                    {item.name}
                  </Text>
                )}
              </View>
              <View style={styles.actionsContainer}>
                {updatingChatId === item.id ? (
                  <Button
                    title="Save"
                    onPress={() => handleUpdateChat(item.id, updatedChatName)}
                    style={styles.actionButton}
                  />
                ) : (
                  <Button
                    title="Update"
                    onPress={() => {
                      setUpdatingChatId(item.id);
                      setUpdatedChatName(item.name);
                    }}
                    style={styles.actionButton}
                  />
                )}
                <Button
                  title="Delete"
                  onPress={() => handleDeleteChat(item.id)}
                  color="red"
                  style={styles.actionButton}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.newChatContainer}>
        <Input
          style={styles.input}
          value={newChatName}
          onChangeText={setNewChatName}
          placeholder="Enter chat name"
        />
        <Button title="Create Chat" onPress={handleCreateChat} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  chatContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatName: {
    marginLeft: 10,
    fontSize: 16,
    maxWidth: '70%',
    flexWrap: 'wrap',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  actionButton: {
    marginLeft: 10,
  },
  newChatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchInput: {
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: 300,
  },
});
