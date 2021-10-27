const checkMaindiagonal = (board, i, j, char) =>{
    if (char === null)
        return null;
    const minI = i - 4;
    const minJ = j - 4;
    for(var k = 0; k < 5; k++){
        try{
            if (board[minI+k][minJ+k].char === char &&
                board[minI+k+1][minJ+k+1].char === char &&
                board[minI+k+2][minJ+k+2].char === char &&
                board[minI+k+3][minJ+k+3].char === char &&
                board[minI+k+4][minJ+k+4].char === char)
            return [
                {i: minI+k,j: minJ+k},
                {i: minI+k+1,j: minJ+k+1},
                {i: minI+k+2,j: minJ+k+2},
                {i: minI+k+3,j: minJ+k+3},
                {i: minI+k+4,j: minJ+k+4},
            ];
        }
        catch (error){
             
        }
    }
    return null;
}
const checkSubDiagonal = (board, i, j, char) =>{
    if (char === null)
        return null;
    const minI = i - 4;
    const maxJ = j + 4;
    for(var k = 0; k < 5; k++){
        try{
            if (board[minI+k][maxJ-k].char === char &&
                board[minI+k+1][maxJ-k-1].char === char &&
                board[minI+k+2][maxJ-k-2].char === char &&
                board[minI+k+3][maxJ-k-3].char === char &&
                board[minI+k+4][maxJ-k-4].char === char)
            return [
                {i: minI+k,j: maxJ-k},
                {i: minI+k+1,j: maxJ-k-1},
                {i: minI+k+2,j: maxJ-k-2},
                {i: minI+k+3,j: maxJ-k-3},
                {i: minI+k+4,j: maxJ-k-4},
            ];
        }
        catch (error){
             
        }
    }
    return null;
}
const checkVertical = (board, i, j, char) =>{
    if (char === null)
        return null;
    const minI = i - 4;
    for(var k = minI; k < minI + 5; k++){
        try{
            if (board[k][j].char === char &&
                board[k+1][j].char === char &&
                board[k+2][j].char === char &&
                board[k+3][j].char === char &&
                board[k+4][j].char === char)
            return [
                {i: k,j: j},
                {i: k+1,j: j},
                {i: k+2,j: j},
                {i: k+3,j: j},
                {i: k+4,j: j},
            ];
        }
        catch (error){
             
        }
    }
    return null;
}
const checkHorizontal = (board, i, j, char) =>{
    if (char === null)
        return null;
    const minJ = j - 4;
    
    for(var k = minJ; k < minJ + 5; k++){
        try{
            if (board[i][k].char === char && 
                board[i][k+1].char === char && 
                board[i][k+2].char === char &&
                board[i][k+3].char === char &&
                board[i][k+4].char === char)
            return [
                {i,j: k},
                {i,j: k+1},
                {i,j: k+2},
                {i,j: k+3},
                {i,j: k+4},
            ];
        }
        catch (error){
            
        }
    }
    return null;
}
const calculateWinner = (board, i, j, char) =>{
    return (checkMaindiagonal(board, i, j, char)
            || checkSubDiagonal(board, i, j, char)
            || checkVertical(board, i, j, char)
            || checkHorizontal(board, i, j, char)) ;
    
}
export default calculateWinner;