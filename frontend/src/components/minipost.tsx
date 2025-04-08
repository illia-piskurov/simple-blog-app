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
          <img src="https://w.wallhaven.cc/full/m3/wallhaven-m38jq9.jpg" className="mx-auto rounded-xl mt-6"></img>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MiniPost;
