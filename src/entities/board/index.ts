import { useGameContext } from "@/shared/store";
import { useEffect } from "react";
import { IWinner, IPlayer } from "@/shared/interfaces";

const useBoardUseCase = () => {
    const { board, setWinner } = useGameContext();

    const checkWinner = (): IWinner => {
        const winningLines = [
            [0, 1, 2],   // Первая строка
            [3, 4, 5],   // Вторая строка
            [6, 7, 8],   // Третья строка
            [0, 3, 6],   // Первый столбец
            [1, 4, 7],   // Второй столбец
            [2, 5, 8],   // Третий столбец
            [0, 4, 8],   // Главная диагональ
            [2, 4, 6]    // Побочная диагональ
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

        return null;
    };

    useEffect(() => {
        const winner = checkWinner();
        setWinner(winner);
    }, [board]);

    return { checkWinner };
};

export { useBoardUseCase };
