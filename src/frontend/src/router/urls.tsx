import CreateRoom from "@/features/rooms/CreateRoom";
import Room from "@/features/rooms/Room";
import JoinRoom from "@/features/rooms/JoinRoom";
import Sessions from "@/features/session/Sessions";
import type { JSX } from "react";

export type RouteType = {
  path: string;
  element: JSX.Element
}

export const roomRoutes: RouteType[] = [
  { path: "/rooms/createRoom", element: <CreateRoom /> },
  { path: "/rooms/:roomId", element: <Room /> },
  { path: "/rooms/joinRoom", element: <JoinRoom /> }
];

export const sessionRoutes: RouteType[] = [
  { path: "/sessions/all", element: <Sessions /> }
]