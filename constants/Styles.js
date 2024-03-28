import Colors from "./Colors";

export default {
    titleContainer: {
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        width: '100%',
        alignContent: 'flex-start',

    },
    pageTitle: {
        fontSize: 24,
        fontFamily: 'MuseoModerno-Black',
        backgroundColor: '#ffffff',
        color: Colors.primary,
        borderBottomWidth: 0,
    },
    firstLetterPageTitle: {
        fontSize: 24,
        fontFamily: 'MuseoModerno-Black',
        backgroundColor: '#ffffff',
        color: Colors.heartColor,
        borderBottomWidth: 0,
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    location: {
        fontSize: 12,
        color: Colors.primary,
        fontFamily: 'MuseoModerno-Light',
        flex: 1,
    },

    title: {
        fontFamily: 'MuseoModerno-SemiBold',
        fontSize: 16,
    },
    description: {
        fontFamily: 'MuseoModerno-Light',
        fontSize: 13,
        color: "#888",
        display: 'flex',
        marginVertical: 5,
        marginTop: -2,
    },
    time: {
        fontSize: 13,
        color: "#808080",
        marginTop: 5
    },
    icon: {
        width: 25,
        height: 25,
    },
    iconData: {
        width: 15,
        height: 15,
        marginTop: 5,
        marginRight: 5
    },
    timeContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'flex-start'
    },

    column: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start'
    },

    button: {
        fontFamily: 'MuseoModerno-SemiBold',
        fontSize: 14,
        color: "#fff",
    },

    whiteText: {
        color: "#fff",
        fontFamily: 'MuseoModerno-SemiBold',
    },

    underline: {
        width: '100%',
        borderColor: Colors.primary,
        borderWidth: 1,
        height: 1,
        marginBottom: 10
    },
    h1: {
        fontFamily: 'MuseoModerno-Bold',
        fontSize: 24,
        color: 'black',
        marginBottom: 10
    },
    "ms-2": {
        marginLeft: 6,
    },
    labelContainer: {
        alignSelf: 'flex-start',
        marginLeft: 2
    },
    labelText: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingVertical: 8,
        color: Colors.primary,
        fontFamily: 'MuseoModerno-SemiBold'
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'start',
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputContainerActive: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.primary,
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'start',
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputContainerActiveRed: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.heartColor,
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'start',
        shadowColor: Colors.heartColor,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputs: {
        height: 36,
        marginLeft: 10,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        paddingRight: 10,
        textAlignVertical: 'top',
        fontFamily: 'MuseoModerno-Light',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 4,
        width: '100%',
        borderRadius: 8,
        backgroundColor: 'transparent',
    },
    buttonPrimary: {
        backgroundColor: Colors.primary,
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 10,
    },
    buttonSecondary: {
        backgroundColor: Colors.secondary,
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'MuseoModerno-SemiBold'
    },
}