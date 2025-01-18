// app/class/enroll/page.js
import EnrollmentForm from "./enrollmentForm";

export default async function Page({ searchParams }) {
  // searchParams는 Promise 객체이므로 await으로 처리
  const params = await searchParams;
  const selectedGenre = params?.selectedGenre || ""; // "modern" 등
  const selectedLevel = params?.selectedLevel || ""; // "basic" 등

  return (
    <div>
      <EnrollmentForm selectedGenre={selectedGenre} selectedLevel={selectedLevel} />
    </div>
  );
}
