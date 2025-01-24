import { useGameContext } from "@/shared/store";
import { useEffect } from "react";
import { IWinner, IPlayer } from "@/shared/interfaces";

const useBoardUseCase = () => {
    const { board, setWinner } = useGameContext();

    const checkWinner = (): IWinner => {
        const winningLines = [
            [0, 1, 2],   // Горизонтальные линии
            [3, 4, 5],   
            [6, 7, 8],   
            [0, 3, 6],   // Вертикальные линии
            [1, 4, 7],   
            [2, 5, 8],   
            [0, 4, 8],   // Диагонали
            [2, 4, 6]    
        ];

        for (const line of winningLines) {
            const [first, second, third] = line;
            
            // Проверяем наличие игрока и совпадение символов
            if (
                board[first].player && 
                board[first].player === board[third].player && 
                board[first].player === board[second].player
            ) {
                return board[first].player as IPlayer;
            }
        }
        
        // Проверка на ничью
        const isDraw = board.every(cell => cell.player !== null);
        if (isDraw) {
            console.log('Ничья!');
        }

        return null;
    };

    useEffect(() => {
        const winner = checkWinner();
        setWinner(winner);
    }, [board]);

    return { checkWinner };
};

export { useBoardUseCase };
