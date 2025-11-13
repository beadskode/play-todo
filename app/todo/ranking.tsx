import { TrophyIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import { cn } from "@/lib/utils";

export default async function Ranking({
  className,
  userEmail,
}: {
  className?: string;
  userEmail: string;
}) {
  const rankings = await prisma.member.findMany({
    take: 5,
    orderBy: {
      score: "desc",
    },
    select: {
      id: true,
      nickname: true,
      email: true,
      score: true,
    },
  });
  if (!rankings) return <></>;
  if (rankings.length > 5) rankings.splice(4);

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-5 flex place-content-center items-center font-semibold text-stone-600 text-xl">
        <TrophyIcon size={20} />
        <h1 className="ms-1 text-center">Ranking</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Nickname</TableHead>
            <TableHead>Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankings.map((i, idx) => (
            <TableRow key={i.id}>
              <TableCell className="text-center">{idx + 1}</TableCell>
              <TableCell
                className={
                  userEmail && userEmail === i.email
                    ? "font-bold text-red-500"
                    : ""
                }
              >
                {i.nickname}
              </TableCell>
              <TableCell>{i.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
