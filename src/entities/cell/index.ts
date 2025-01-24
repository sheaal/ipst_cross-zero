import { useGameContext } from "@/shared/store";
import { ICell } from "@/shared/interfaces";
import { useState } from "react";

const useCellUseCase = () => {
    const { 
        board, 
        setBoard, 
        currentPlayer, 
        setCurrentPlayer, 
        winner, 
    } = useGameContext();

     // Создаем состояние для хранения количества ходов
    const [moveCount, setMoveCount] = useState(1);  

    const handleCellClick = (cell: ICell): void => {
        // Проверка на наличие победителя
        if (winner) {
            console.log("Winner!: ", winner);
            return;
        }

        // Проверка на занятость ячейки
        const existingCell = board.find(c => c.id === cell.id);
        if (existingCell && existingCell.player) {
            console.log("Ячейка уже занята. Ход невозможен");
            return;
        }
        // Увеличиваем счетчик ходов
        setMoveCount(moveCount + 1);  

        // Обновление состояния доски
        const newBoard = board.map(c => c.id === cell.id ? { ...c, player: currentPlayer } : c);
        setBoard(newBoard);

        // Смена игрока
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

         // Выводим текущее количество ходов в консоль
        console.log(`Сделано ходов: ${moveCount}`);  
    }

    return {
        moveCount,
        handleCellClick
    };
};

export { useCellUseCase };