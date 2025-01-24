// board/index.ts
import { useGameContext } from "@/shared/store";
import { useEffect } from "react";
import { IWinner } from "@/shared/interfaces";

const useBoardUseCase = () => {
    const { board, setWinner } = useGameContext();

    const checkWinner = (): IWinner | null => {
        // Определяем выигрышные комбинации
        const winningCombinations = [
            // Горизонтальные комбинации
            ['0-0', '0-1', '0-2'],
            ['1-0', '1-1', '1-2'],
            ['2-0', '2-1', '2-2'],
            // Вертикальные комбинации
            ['0-0', '1-0', '2-0'],
            ['0-1', '1-1', '2-1'],
            ['0-2', '1-2', '2-2'],
            // Диагональные комбинации
            ['0-0', '1-1', '2-2'],
            ['0-2', '1-1', '2-0'],
        ];

		for (const combination of winningCombinations) {
            const [a, b, c] = combination;

            // Проверяем значения в ячейках по идентификаторам
            const valueA = board[a];
            const valueB = board[b];
            const valueC = board[c];

            if (valueA && valueA === valueB && valueB === valueC) {
                return { winner: valueA, line: `combination-${a}-${b}-${c}` };
            }
        }

        return null; // Если победителя нет
    };

    useEffect(() => {
        const winner = checkWinner();
        setWinner(winner);
    }, [board]);

    return { checkWinner };
};

export { useBoardUseCase };