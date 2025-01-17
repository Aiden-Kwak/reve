import MyPageForm from "@/components/myPageForm";
import AuthGuard from "@/utils/authGuard";

export default function MyPage() {
  return (
    <AuthGuard>
    <div>
      <MyPageForm />
    </div>
    </AuthGuard>
  );
}
