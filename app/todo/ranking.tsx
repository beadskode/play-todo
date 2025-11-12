import { Trophy } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";

export default async function Ranking({ userEmail }: { userEmail: string }) {
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
    <div className="main-container sm:40 w-full flex-1">
      <div className="mb-5 flex place-content-center items-center font-semibold text-stone-600 text-xl">
        <Trophy size={20} strokeWidth={2.5} />
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
