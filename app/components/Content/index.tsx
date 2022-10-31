import React, { FC } from 'react';
import { Table } from '../Table';

type ContentProps = {
  mode?: string;
};

export const Content: FC<ContentProps> = ({ mode }) => {
  switch (mode) {
    case 'ciw':
      return <Table />;
    case 'placeholder':
      return <h2>Placeholder</h2>;
    default:
      return null;
  }
};
