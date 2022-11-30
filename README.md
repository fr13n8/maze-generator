# Mazes generator and path finder 

## **Labyrinth generation algorithms**
### **Aldous-Broder algorithm**
From [Wikipedia](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Aldous-Broder_algorithm), the free encyclopedia:
>The Aldous-Broder algorithm also produces uniform spanning trees.
>1. Pick a random cell as the current cell and mark it as visited.
>2. While there are unvisited cells:
>       1. Pick a random neighbour.
>       2. If the chosen neighbour has not been visited:
>             1. Remove the wall between the current cell and the chosen neighbour.
>             2. Mark the chosen neighbour as visited.
>             3. Make the chosen neighbour the current cell.

https://user-images.githubusercontent.com/57458390/204816777-66d40851-fbce-4feb-b576-dd3289f4c670.mp4

### **Randomized depth-first search algorithm**
From [Wikipedia](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_implementation), the free encyclopedia:
>This algorithm, also known as the "recursive backtracker" algorithm, is a randomized version of the depth-first search algorithm.Frequently implemented with a stack, this approach is one of the simplest ways to generate a maze using a computer.Mazes generated with a depth-first search have a low branching factor and contain many long corridors, because the algorithm explores as far as possible along each branch before backtracking.
>1. Given a current cell as a parameter
>2. While there are unvisited cells:
>       1. Pick a random neighbour.
>       2. Mark the current cell as visited
>       3. While the current cell has any unvisited neighbour cells:
>             1. Choose one of the unvisited neighbours.
>             2. Remove the wall between the current cell and the chosen cell.
>             3. Invoke the routine recursively for the chosen cell.

https://user-images.githubusercontent.com/57458390/204816822-ce09b89e-2b30-4530-8f03-1dcfeb2aa35b.mp4

## **Path finding algorithms**

### **Breadth-first search (BFS)**
From [Wikipedia](https://en.wikipedia.org/wiki/Breadth-first_search), the free encyclopedia:
>BFS is an algorithm for searching a tree data structure for a node that satisfies a given property. It starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level. Extra memory, usually a queue, is needed to keep track of the child nodes that were encountered but not yet explored.

https://user-images.githubusercontent.com/57458390/204816864-7511d9f6-297d-4dbd-8029-e0c102955c84.mp4
