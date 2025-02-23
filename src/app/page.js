import Image from "next/image";
import * as React from "react";
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



async function fetchNews() {
  const res = await fetch('https://allsvenskan.se/data-endpoint/team/news?id=AIK&limit=10');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response.documents;
}

async function fetchGamesAndTeams() {
  const res = await fetch('https://allsvenskan.se/data-endpoint/match-list/minimized?season=2025');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const response = await res.json();

  // Extract games from the response and filter by round = 1
  const games = response.documents.filter(game => game.fields.round?.integerValue === "1");

  return games
  //get the teams for current round
  //const teams = games.map(game => game.fields.teams.arrayValue.values);

}

export default async function Home() {
  const news = await fetchNews();
  const games = await fetchGamesAndTeams();

  return (
    <div className="flex h-dvh">

      <div className="w-1/4 p-4">
        <ScrollArea className="h-dvh rounded-md overflow-auto"> {/* Ensure overflow for scrolling */}
          {games.map((game) => (
            <Card key={game.fields.id.integerValue} className="bg-zinc-950 text-white mb-4 border-1 flex flex-col h-40">
              <CardHeader className="flex-grow flex items-center justify-center"> {/* Center content */}
                <CardTitle>{game.fields.homeTeamAbbrv.stringValue} - {game.fields.visitingTeamAbbrv.stringValue}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col items-center justify-center"> {/* Center content */}
                <p>Datum: {game.fields.startDate.stringValue.slice(0, 10)}</p>
                <p>Omgång: {game.fields.round.integerValue} </p>
              </CardContent>
              <CardFooter className="flex-grow"> {/* Optional: can add more styling if needed */}
                {/* Footer content if needed */}
              </CardFooter>
            </Card>
          ))}
        </ScrollArea>
      </div>




      <div className="w-2/4 p-4"> {/* 3/4 column for other content */}
        <ScrollArea className="h-dvh rounded-md">
          {news.map((doc) => (
            <Card key={doc.fields.id.stringValue} className="bg-zinc-950 text-white mb-4 border-1">
              <CardHeader>
                <CardTitle>{doc.fields.title.stringValue}</CardTitle>
                <CardDescription>{doc.fields.description.stringValue}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={doc.fields.image.stringValue}
                  alt={doc.fields.title.stringValue}
                  style={{ width: '100%', height: 'auto' }}
                />
              </CardContent>
              <CardFooter>
                <Link href={doc.fields.articleUrl.stringValue} target="_blank" passHref>
                  <Button>Till artikeln</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </ScrollArea>
      </div>
      <div className="w-1/4 p-4"> {/* 3/4 column for other content */}
        <Link href="/table">
          <Button>Tabell</Button>
        </Link>
      </div>

    </div >
  );
}
