import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

interface MiniPostProps {
  id: number;
  title: string;
  description: string;
  body: string;
}

const MiniPost = ({ id, title, description, body }: MiniPostProps) => {
  return (
    <Link href={`/post/${id}`}>
      <Card className="cursor-pointer hover:shadow-lg transition">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{body}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MiniPost;
