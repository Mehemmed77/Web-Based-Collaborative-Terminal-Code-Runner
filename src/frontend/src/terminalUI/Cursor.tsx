interface CursorProps {
    widthOfText: number,
}

export default function Cursor({ widthOfText }: CursorProps) {
    const width = widthOfText + 10;

    return (    
        <div id="cursor" style={{ left: `${width}px` }} ></div>
    )
}