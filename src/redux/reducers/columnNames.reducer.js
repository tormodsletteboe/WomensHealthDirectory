const ageRanges = (state = [], action) => {
    switch (action.type) {
      case 'SET_COLUMN_NAMES_Guidelines':
        return ['Agency', 'Info', 'Grade', 'Date'];
      case 'SET_COLUMN_NAMES_Diagnostic Tools':
          return ['Name', 'Info'];
      case 'SET_COLUMN_NAMES_FAQ':
        return ['Question', 'Answer'];
      case 'SET_COLUMN_NAMES_Questions for Your Doctor':
        return ['Question', 'Category'];
        case 'SET_COLUMN_NAMES_Resources':
          return ['Name', 'Description', 'link'];      
      default:
        return state;
    }
  };
  
export default ageRanges;