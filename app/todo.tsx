import { MemberProfile } from "./member/member-profile";

export function Todo() {
    return (
        <div className="hmf-padding flex h-full w-full justify-between gap-3">
            <MemberProfile />
            <div className="main-container flex-1 text-center">TODO</div>
        </div>
    );
}