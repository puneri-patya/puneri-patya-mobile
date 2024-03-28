import Colors from "../../../constants/Colors";
import VerifiedUser from "../../../constants/VerifiedUser";
import { Octicons } from '@expo/vector-icons';

export const VerifiedBadge = ({ userId }: { userId: string }) => {
    return (
        VerifiedUser.verifiedUsersId.includes(userId) ? <Octicons name="verified" size={12} color={Colors.primary} /> : <></>
    );
}