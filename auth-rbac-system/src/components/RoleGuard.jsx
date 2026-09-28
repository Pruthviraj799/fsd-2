import { useAuth } from "../context/AuthContext";
import { hasPermission } from "../utils/permissions";

function RoleGuard({ permission, children }) {

    const { user } = useAuth();

    if (!user) {
        return null;
    }

    if (!hasPermission(user.role, permission)) {
        return null;
    }

    return children;
}

export default RoleGuard;