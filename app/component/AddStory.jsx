import Dialog from 'react-native-dialog';
import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Image, View, Text } from "react-native";
import { PATHS } from '../../constants/pathConstants';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from "expo-image-picker";


function AddStory({ visible, setVisible, user }) {
    const [postImg, setPostImg] = useState(null);
    const [text, setText] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access media is required!");
            }
        })();
    }, []);

    const fetchImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setPostImg(result.assets[0]);
        }
    };

    const handleFormSubmit = async () => {
        const newErrors = {};
        if (!text.trim()) {
            newErrors.text = "Title is required";
        }
        if (!postImg || !postImg.uri) {
            newErrors.Image = "Image is required";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("text", text);
        if (postImg?.uri) {
            formDataToSend.append("postImg", {
                uri: postImg.uri,
                name: postImg.fileName || `image_${Date.now()}.jpg`,
                type: postImg.mimeType || "image/jpeg",
            });
        }

        try {
            const response = await fetch(`${PATHS.BASEURL}/user/addStory`, {
                method: "POST",
                body: formDataToSend,
            });

            const textResponse = await response.text();
            const result = JSON.parse(textResponse);

            if (response.ok) {
                alert("Post submitted successfully!");
                cancel();
            } else {
                 alert("Error: " + result.error);
              
            }
        } catch (error) {
            alert("Failed to submit post. Please try again.");
        }
    };

    const cancel = () => {
        setPostImg(null);
        setText("");
        setErrors({});
        setVisible(false);
    };

    return (
        <Dialog.Container visible={visible}>
            <Dialog.Title style={styles.Dialog}>What's on your mind?</Dialog.Title>
            <TextInput
                style={styles.textInput}
                placeholder="Write a caption..."
                value={text}
                onChangeText={setText}
                multiline
                numberOfLines={5}
                maxLength={280}
            />
            {errors.text && <Text style={styles.errorText}>{errors.text}</Text>}
            {postImg && postImg.uri ? (
                <Image source={{ uri: postImg.uri }} style={styles.profileImage} />
            ) : (
                <View style={styles.iconbox}>
                    <FontAwesome onPress={fetchImage} name="image" style={styles.icon} />
                </View>
            )}
            {errors.Image && <Text style={styles.errorText}>{errors.Image}</Text>}
            <Dialog.Button label="Cancel" onPress={cancel} style={styles.cancel} />
            <Dialog.Button label="Confirm" onPress={handleFormSubmit} style={styles.confirmBtn} />
        </Dialog.Container>
    );
}

const styles = StyleSheet.create({
    Dialog: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 8,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 5,
    },
    cancel: {
        backgroundColor: 'red',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        marginRight: 15,
    },
    confirmBtn: {
        backgroundColor: PATHS.mainColor,
        color: 'white',
        padding: 10,
        borderRadius: 5,
    },
    iconbox: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    icon: {
        color: PATHS.mainColor,
        fontSize: 80,
        marginBottom: 20,
    },
    profileImage: {
        height: 340,
        width: 290,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
});

export default AddStory;
