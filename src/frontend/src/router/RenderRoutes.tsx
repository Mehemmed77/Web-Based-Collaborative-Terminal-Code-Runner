import { Route } from "react-router";
import type { RouteType } from "./urls";

interface RenderRoutesProps {
    routes: RouteType[]
}

export default function RenderRoutes({ routes }: RenderRoutesProps) {
    return routes.map(r => (
        <Route key={r.path} path={r.path} element={r.element} />
    ));
}