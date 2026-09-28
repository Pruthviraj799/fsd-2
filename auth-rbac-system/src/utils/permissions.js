const permissions = {
    admin: ["read", "create", "edit", "delete"],
    editor: ["read", "create", "edit"],
    viewer: ["read"]
};

export function hasPermission(role, permission) {
    return permissions[role]?.includes(permission);
}