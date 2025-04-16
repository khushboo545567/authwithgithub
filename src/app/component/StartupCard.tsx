import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const StartupCard = function ({ post }: { post: StartupCardtype }) {
  const {
    _createdAt,
    views,
    author: { id: authorId, name },
    title,
    catogery,
    _id,
    image,
    description,
  } = post;
  return (
    <li className="startup-card group">
      <div className="flex justify-between">
        <p>{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <Eye className="size-6" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>
      <div className="flex flex-between gap-5 mt-5">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className="font-semibold">{name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-2xl font-bold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          <Image
            src="https://placehold.co/48x48"
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img
          src="https://media.wired.com/photos/6595c546f6145f9ca1309145/master/w_2560%2Cc_limit/_BC-wired_selmasabanovic_kaylareeferphoto-127.jpg"
          alt="placeholder"
          className="startup-card_img"
        />
      </Link>
      <div className="flex justify-between gap-3 mt-5">
        <Link href={`/?query=${catogery.toLowerCase}`}>
          <p className="font-medium">{catogery}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};
export default StartupCard;
