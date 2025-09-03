import Avatar from "@/components/avatar/Avatar";
import LearningCodeEditor from "@/components/editor/LearningCodeEditor";
export default function AvatarPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Avatar />
      <LearningCodeEditor />
    </div>
  );
}
