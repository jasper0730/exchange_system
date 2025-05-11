export async function GET(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const userInfo = { userId: "123", role: "admin", routes:{

  }};   const roleData = mockDB.find((r) => r.name === userInfo.role);
  if (!roleData) return NextResponse.json({ message: "Role not found" }, { status: 403 });

  const routes = Object.entries(roleData.permissions).map(([path, status]) => ({
    path,
    status,
  }));

  return NextResponse.json({
    role: roleData.name,
    routes,
    lastUpdated: new Date().toISOString(),
  });
}