import Colors from "./Colors";

export default {
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
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

    button: {
        fontFamily: 'MuseoModerno-SemiBold',
        fontSize: 14,
        color: "#fff",
    }

}