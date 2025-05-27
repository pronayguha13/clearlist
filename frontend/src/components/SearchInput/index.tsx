import { Icon } from "@iconify/react";
import style from "./style.module.css";
import Popover from "../Popover";
import { useEffect, useRef, useState } from "react";
import { useTodoContext } from "../../context";
const SearchInput = () => {
  const { search } = useTodoContext();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLInputElement>>(null);
  const [query, setQuery] = useState<string>("");
  const timer = useRef<NodeJS.Timeout | null>(null);

  const { data, isFetching, isSuccess, isError, refetch } = search(query)


  /**
   * @description Function to handle the click on the individual search item
   *
   */
  /*  const onClickSearchItem = (todo: [string, ITODO]) => {
      navigate(`/tasks/${todo[0]}`);
    };*/
  const handleQueryChange = (event: React.ChangeEvent) => {
    console.log("event:", (event.target as HTMLInputElement).value);
    const { value } = (event.target as HTMLInputElement);
    if (value.length) {
      setQuery(value)
    } else {
      setQuery("");
    }
  }

  useEffect(() => {
    timer.current = setTimeout(() => {
      console.log("Executing handler fn", query);
      //fetch the search result
      refetch()
    }, 300)

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    }
  }, [query, refetch])

  useEffect(() => {
    if (searchInputRef.current) {
      setAnchorEl(searchInputRef.current);
    }
  }, []);

  const renderSearchResult = () => {
    if (isFetching) return <p>Fetching result...</p>

    if (isError) return <p>Failed to search...</p>

    if (isSuccess && data) {
      return data.map((todo, index) => (
        <p key={index}> {todo.title}</p>
      ))
    } else {
      return <p>No data...</p>
    }
  }
  return (
    <div className={style.search_container}>
      <input
        type="search"
        className={style.search_input}
        ref={searchInputRef}
        onChange={(event) => handleQueryChange(event)}
      />
      <button className={style.search_button} disabled={isFetching}>
        <Icon icon="material-symbols:search" width="32px" height="32px" />
      </button>
      {anchorEl && (
        <Popover parent={anchorEl}>
          {query.length ? renderSearchResult() : null}
        </Popover>
      )
      }
    </div >
  );
};

export default SearchInput;
