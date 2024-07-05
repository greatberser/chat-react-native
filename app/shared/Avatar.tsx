import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface AvatarProps {
  uri: string;
}

const Avatar: React.FC<AvatarProps> = ({ uri }) => {
  return <Image source={{ uri }} style={styles.avatar} />;
};

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default Avatar;
