'use client';
import { StyledNavigation, StyledPaymentItem } from './style';
import Divider from '../Divider';
import furnitureIcon from '../../../../assets/icons/furniture-icon.svg';
import laundryIcon from '../../../../assets/icons/laundry-icon.svg';
import internetIcon from '../../../../assets/icons/internet-icon.svg';
import medicalIcon from '../../../../assets/icons/medical-icon.svg';
import veterinaryIcon from '../../../../assets/icons/veterinary-icon.svg';
import { currentFormat } from '../../../../utils/currencyFormat';
import { dateFormatTimeAgo } from '../../../../utils/DateFormat';
import {
  dataPendingPayments,
  iDataPendingPayments,
} from '../../../../mock/dashboard';
import { useEffect, useState } from 'react';
import { Spinner } from '../../../../components/Spinner';
import { Transaction } from '../../../../types/transactions';
import { TRANSACTIONS_SERVICES } from '../../../../services/api';

const getIcon = (type: string) => {
  switch (type) {
    case 'laundry':
      return (
        <img
          src={laundryIcon}
          alt="Ícone da lavanderia"
          width={24}
          height={24}
        />
      );
    case 'veterinary':
      return (
        <img
          src={veterinaryIcon}
          alt="Ícone da Veterinária"
          width={24}
          height={24}
        />
      );
    case 'internet':
      return (
        <img
          src={internetIcon}
          alt="Ícone da Internet"
          width={24}
          height={24}
        />
      );
    case 'medical':
      return (
        <img src={medicalIcon} alt="Ícone de Medicina" width={24} height={24} />
      );
    case 'furniture':
      return (
        <img
          src={furnitureIcon}
          alt="Ícone da Mobilia"
          width={24}
          height={24}
        />
      );
    default:
      return <img src={''} alt="Ícone da padrao" width={24} height={24} />;
  }
};

const RecentTransactions = () => {
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    TRANSACTIONS_SERVICES.filter({
      pageSize: 4,
      sortBy: ['date:desc'],
    })
      .then((res) => {
        setRecentTransactions(res.transactions);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="recent-transictions">
      <div className="header">
        <h3>Recent Transactions</h3>
        <a href="#">See all</a>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {isLoading && <Spinner />}
      </div>
      {recentTransactions.map((item) => (
        <div key={item.id}>
          <div className="user-wrapper">
            {/* <img src={item.imgUrl} width={48} alt="Imagem do usuário logado" /> */}
            <div className="user-info">
              <span className="name">{item.destiny}</span>
              {item.date && (
                <span className="hour">{dateFormatTimeAgo(item.date)!}</span>
              )}
            </div>
            {item.type === 'IN' ? (
              <span className="money positive">
                + {currentFormat(item.amount)}
              </span>
            ) : (
              <span className="money negative">
                - {currentFormat(item.amount)}
              </span>
            )}
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

const Navigation = () => {
  return (
    <StyledNavigation className="navigation">
      <div className="pending-payments">
        <div className="header">
          <h3>Pending Payments</h3>
          <a href="#">See all</a>
        </div>
        <ul className="payment-list">
          {dataPendingPayments.map((item: iDataPendingPayments) => (
            <StyledPaymentItem key={item.id} type={item.type}>
              <div className="icon-wrapper">{getIcon(item.type)}</div>
              <span>{item.name}</span>
            </StyledPaymentItem>
          ))}
        </ul>
      </div>
      <Divider />
      <RecentTransactions />
    </StyledNavigation>
  );
};

export default Navigation;
