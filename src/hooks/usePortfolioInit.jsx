import PubSub from 'pubsub-js';
import { useEffect } from 'react';

export default function usePortfolioInit(setOpenAddModal, handleLeftTreeEvent) {
  useEffect(() => {
    const breadCrumbLeft = [
      { name: '****' },
      { name: 'Work Files', active: true },
      {
        name: '',
        icon: true,
        click: () => {
          setOpenAddModal(true);
        },
      },
    ];

    // TODO: List/Magazine view Handler
    const breadCrumbRight = <div></div>;

    setTimeout(() => {
      PubSub.publish('breadCrumbEvent', {
        left: breadCrumbLeft,
        right: breadCrumbRight,
      });
    }, 100);

    PubSub.subscribe('LeftTree', handleLeftTreeEvent);
  }, []);

  return;
}
