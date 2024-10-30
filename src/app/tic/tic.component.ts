import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-tic',
  templateUrl: './tic.component.html',
  styleUrls: ['./tic.component.scss']
})
export class TicComponent implements OnInit {
  @ViewChild('wins') wins: any; // Specify TemplateRef for 'wins'
  dialogRef: MatDialogRef<any> | null = null; // Initialize to null
  board: string[] = Array(9).fill(null);
  currentPlayer: string = 'X';
  winner: string | null = null;
  playerXWins: number = 0;
  playerOWins: number = 0;
  roundOver: boolean = false;
  roundCount: number = 1;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openWinsModel(): void {
    this.dialogRef = this.dialog.open(this.wins, {
      panelClass: 'custom-dialog-container',
      minWidth: '300px' // Adjusted minimum width for better display
    });
  
    this.dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        if (this.dialogRef) {
          this.dialogRef.close(); // Auto-close after 3 seconds
        }
      }, 1000);
    });
  }
  

  makeMove(index: number): void {
    if (!this.board[index] && !this.winner && !this.roundOver) {
      this.board[index] = this.currentPlayer;
      if (this.checkWinner()) {
        this.winner = this.currentPlayer;
        this.roundOver = true;
        this.updateScore();
        setTimeout(() => this.openWinsModel(), 500); // Show winner dialog with delay
      } else if (this.board.every(cell => cell !== null)) {
        // It's a tie, automatically replay the round
        this.roundOver = true;
        this.winner = null;
        console.log("Game Tie_____________________________")
        // No winner in case of tie
        setTimeout(() => this.replayRound(), 1000); // Delay for visual feedback
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  checkWinner(): boolean {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      return (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      );
    });
  }

  updateScore(): void {
    if (this.winner === 'X') {
      this.playerXWins++;
    } else if (this.winner === 'O') {
      this.playerOWins++;
    }
  }

  resetRound(): void {
    this.board = Array(9).fill(null);
    this.winner = null;
    this.roundOver = false;
    this.currentPlayer = 'X';
    this.roundCount++;
  }

  replayRound(): void {
    this.board = Array(9).fill(null);
    this.winner = null;
    this.roundOver = false;
    this.currentPlayer = 'X';
  }
}
