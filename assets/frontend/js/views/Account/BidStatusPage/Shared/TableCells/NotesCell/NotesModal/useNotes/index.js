import { useState, useEffect } from 'react';
import CustomerNotesService from 'frontend/js/api/CustomerNotesService';
import useInfiniteScroll from './useInfiniteScroll';

function useNotes({ lotId, auction, containerRef, onReadNotes, newTotal }) {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
  const customerNotesService = new CustomerNotesService();

  function scrollBottom() {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }

  function addNote(formData) {
    return customerNotesService.addNote(formData).then((data) => {
      setNotes((currentNotes) => [...currentNotes, data.note]);
      scrollBottom();
    });
  }

  function getAllNotes(page = 1) {
    return customerNotesService.getAllNotes({ stockNumber: lotId, auction, page, size: 25 }).then((data) => {
      const $container = containerRef.current;
      const curScrollPos = $container?.scrollTop;
      const oldScroll = $container?.scrollHeight - $container?.clientHeight;

      const customerNotes = data.data?.reverse();
      setNotes((currentNotes) => [...customerNotes, ...currentNotes]);
      setCurrentPage(page);
      setMaxPage(data.lastPage);

      setTimeout(() => {
        if (page === 1) {
          if (newTotal > 0 && customerNotes.length > 0) {
            const lastCustomerNote = customerNotes[customerNotes.length - 1];
            const timestamp = Math.floor(new Date(lastCustomerNote.createdAt).getTime() / 1000);
            customerNotesService
              .markAsRead(lotId, auction, timestamp)
              .then(() => {
                if (typeof onReadNotes === 'function') {
                  onReadNotes();
                }
              })
              .catch(() => {
                /** Ignore */
              });
          }
          scrollBottom();
        } else {
          const newScroll = $container.scrollHeight - $container.clientHeight;
          $container.scrollTop = curScrollPos + (newScroll - oldScroll);
        }
      }, 0);
    });
  }

  function handleChangePage(page) {
    getAllNotes(page);
  }

  useInfiniteScroll({ containerRef, page: currentPage, maxPage, onChangePage: handleChangePage });

  useEffect(() => {
    setIsLoading(true);
    getAllNotes()
      .catch(() => {
        /** Ignore */
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    notes,
    addNote,
    isLoading,
  };
}

export default useNotes;
