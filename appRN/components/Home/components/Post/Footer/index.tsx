import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FireIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {putVideoLikeByFilename} from '../../../../../redux/slice';
import {
  PutVideoLikeByFilenameProps,
  VideoData,
} from '../../../../../Types/types';
import {AuthContext} from '../../../../AuthProvider/AuthProvider';

type IPostFooterProps = VideoData;

const PostFooter: React.FC<IPostFooterProps> = (props) => {
  const {user} = useContext(AuthContext);
  const dispatch = useDispatch();

  const updateLike = async (data: PutVideoLikeByFilenameProps) => {
    try {
      await dispatch(putVideoLikeByFilename(data));
    } catch (error) {
      console.log('error updateLike', error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.videoInfoBar}>
        <TouchableOpacity
          onPress={() => updateLike({video: props, likeByID: user!.public.id})}>
          {props.likeByThisUser === true ? (
            <FireIcons
              name="local-fire-department"
              size={20}
              color="orangered"
            />
          ) : (
            <FireIcons name="local-fire-department" size={20} color="gray" />
          )}
        </TouchableOpacity>
        <Text style={styles.likeCount}>{props.likeCount}</Text>
      </View>
      <Text style={styles.textFooter}>{props.title} - Awesome</Text>
    </View>
  );
};

export default PostFooter;

const styles = StyleSheet.create({
  wrapper: {
    padding: 8,
  },
  videoInfoBar: {
    display: 'flex',
    flexDirection: 'row',
  },
  likeCount: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  textFooter: {
    fontSize: 16,
  },
});
