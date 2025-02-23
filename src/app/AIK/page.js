import Image from "next/image";
import * as React from "react";
import teamStats from '../data/team-stats-2024.json';
import comparisonData from '../data/mean_median_data.json';
import Link from 'next/link';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


//console.log(teamStats)

const aik = teamStats.find(team => team.abbrv === "AIK");

console.log(aik)

const keys = [
  "goals",
  "shots",
  "shotsOnTarget",
  "shotsPostOrBar",
  "penaltyGoals",
  "subinGoals",
  "headerGoals",
  "cornerHeaderGoals",
  "freekickGoals",
  "allCornerGoals",
  "setPieceGoals",
  "concededCornerGoals",
  "yellowCards",
  "redCards",
  "corners",
  "distanceAsHomeTeam",
  "distanceAsVisitingTeam",
  "totalDistance",
  "concededGoalsSetPiece",
  "homeTeamFirstPeriodAveragePossesion",
  "homeTeamSecondPeriodAveragePossesion",
  "visitingTeamFirstPeriodAveragePossesion",
  "visitingTeamSecondPeriodAveragePossesion",
  "averagePossesion",
  "averageAttendees",
  "totalAttendees"
];




export default async function Home() {




  return (
    <Table className="text-white">
      <TableCaption>AIK Statistics</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Värde</TableHead>
          <TableHead>AIK</TableHead>
          <TableHead>Medelvärde</TableHead>
          <TableHead>Median</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {keys.map((key) => (
          <TableRow>
            <TableCell key={key}>{key}</TableCell>
            <TableCell key={key} className="font-medium">
              {aik[key]}
            </TableCell>
            <TableCell>
              {comparisonData.mean[key]}
            </TableCell>
            <TableCell>
              {comparisonData.median[key]}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
