import { useGameContext } from "@/shared/store";
import { ICell } from "@/shared/interfaces";

const useCellUseCase = () => {
    const { 
        board, 
        setBoard, 
        currentPlayer, 
        setCurrentPlayer, 
        winner 
    } = useGameContext();

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

        // Обновление состояния доски
        const newBoard = board.map(c => c.id === cell.id ? { ...c, player: currentPlayer } : c);
        setBoard(newBoard);

        // Смена игрока
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    return {
        handleCellClick
    };
};

export { useCellUseCase };