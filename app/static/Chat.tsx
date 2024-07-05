import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Avatar, Button, Input } from '../shared';

interface Message {
  id: string;
  text: string;
  sender: string;
  avatar?: string;
}

interface Props {
  route: {
    params: {
      chatId: string;
      chatName: string;
      chatAvatar: string;
    };
  };
}

const Chat: React.FC<Props> = ({ route }) => {
  const { chatId, chatName, chatAvatar } = route.params;
  const DEFAULT_AVATAR = 'https://via.placeholder.com/50'; // Define your default avatar URL

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello!', sender: chatName, avatar: chatAvatar },
    { id: '2', text: 'Hi there!', sender: 'user1', avatar: DEFAULT_AVATAR },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const message: Message = {
      id: Math.random().toString(),
      text: newMessage,
      sender: 'user1',
      avatar: chatAvatar,
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageItem}>
            <Avatar uri={item.avatar || DEFAULT_AVATAR} />
            <Text>
              {item.sender}: {item.text}
            </Text>
          </View>
        )}
      />
      <View style={styles.newMessageContainer}>
        <Input
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Enter your message"
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  newMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default Chat;
