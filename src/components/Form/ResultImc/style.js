import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    resultImc: {
        flex: 1,
        marginTop: 15,
        paddingTop: 60,
        borderRadius: 50,
        alignItems: "center",
        width: "100%",
    },
    info: {
        fontSize: 18,
        color: "#ff0043",
        fontWeight: "bold",
    },
    numberImc: {
        fontSize: 48,
        color: "#ff0043",
        fontWeight: "bold",
    },
    boxShareButton: {
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
    },
    shared: {
        backgroundColor: "#1877f2",
        borderRadius: 50,
        paddingBottom: 5,
        paddingTop: 5,
    },
    sharedText: {
        color: "#FFF",
        fontWeight: "bold",
        paddingHorizontal: 30,
    },
});

export default styles