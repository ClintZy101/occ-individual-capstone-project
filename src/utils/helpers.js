export function truncateBeforeChar(str, char) {
    const index = str.indexOf(char);
    if (index === -1) {
      // Return the original string if the character is not found
      return str;
    }
    // Return the substring before the character
    return str.substring(0, index);
  }

  export function extractInsideParentheses(input) {
    const match = input.match(/\(([^)]+)\)/); // Regular expression to match text inside ()
    return match ? match[1] : input; // Return the first group if found, else null
  }
  
