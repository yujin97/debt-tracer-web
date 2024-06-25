import { UserInfo } from "@/app/utils/fetchUserInfo";

export async function NavigationLayout({
  userInfo,
  children,
}: Readonly<{ userInfo: UserInfo; children: React.ReactNode }>) {
  return (
    <>
      <div className="sticky top-0 z-40 w-full">
        <span>Hello </span>
        {userInfo && userInfo.username}
      </div>
      {children}
    </>
  );
}
