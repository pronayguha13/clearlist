import { Icon } from "@iconify/react";
import style from "./style.module.css";
import Popover from "../Popover";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTodoContext } from "../../context";
import { type ITODO } from "../../types";
const SearchInput = () => {
  const { todos } = useTodoContext();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLInputElement>>(null);
  const [query, setQuery] = useState<string>("");
  const [filteredTODO, setFilteredTODO] = useState<Array<[string, ITODO]>>([]);
  const timer = useRef(null);

  /**
   * @description Function to fitler todo based on query value
   */
  const filterTODO = useCallback(() => {
    if (query.trim().length) {
      console.log("Filtering todos: ", todos);

      let matchedTODO = [];
      todos.forEach((todo: [string, ITODO]) => {
        if (todo[1].title.toLowerCase().includes(query.trim().toLowerCase())) {
          matchedTODO.push(todo);
        }
      });

      setFilteredTODO(matchedTODO);
    }
  }, [query, todos]);

  /**
   * @description Function to handle the change of input field value and update the query state
   *
   */
  const handleQueryChange = (event: React.ChangeEvent) => {
    const { value } = event.target as HTMLElement;
    if (value.trim().length === 0) {
      setFilteredTODO([]);
    }
    setQuery(value);
  };

  /**
   * @description Function to handle the click on the individual search item
   *
   */
  const onClickSearchItem = (todo: [string, ITODO]) => {
    navigate(`/tasks/${todo[0]}`);
  };

  useEffect(() => {
    if (searchInputRef.current) {
      setAnchorEl(searchInputRef.current);
    }
  }, []);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      filterTODO();
    }, 500);
  }, [query, filterTODO]);

  return (
    <div className={style.search_container}>
      <input
        type="search"
        className={style.search_input}
        ref={searchInputRef}
        onChange={(event) => handleQueryChange(event)}
      />
      <button className={style.search_button}>
        <Icon icon="material-symbols:search" width="32px" height="32px" />
      </button>
      {anchorEl && (
        <Popover parent={anchorEl}>
          {query.length ? (
            filteredTODO.length ? (
              filteredTODO.map((todo, index) => (
                <p key={index}> {todo[1].title} </p>
              ))
            ) : (
              <p> No Result </p>
            )
          ) : null}
        </Popover>
      )}
    </div>
  );
};

export default SearchInput;
