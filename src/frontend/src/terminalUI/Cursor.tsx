interface CursorProps {
    left: number,
}

export default function Cursor({ left }: CursorProps) {
    return (    
        <div id="cursor" style={{ left: `${left}px` }} ></div>
    )
}