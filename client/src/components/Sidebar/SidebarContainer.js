import React from 'react';
import PropTypes from 'prop-types';
import { EnsureTTI } from '@deity/falcon-front-kit';
import { CloseSidebarMutation } from './CloseSidebarMutation';
import { OpenSidebarMutation } from './OpenSidebarMutation';
import { SidebarQuery } from './SidebarQuery';

export const SidebarContainer = ({ children }) => (
  <EnsureTTI>
    {({ isReady, forceReady }) => (
      <SidebarQuery>
        {({ data: { sidebar } }) => {
          if (!isReady && sidebar.isOpen) {
            forceReady();
          }

          return (
            <OpenSidebarMutation>
              {open => (
                <CloseSidebarMutation>
                  {close => (isReady ? children({ ...sidebar, open, close }) : null)}
                </CloseSidebarMutation>
              )}
            </OpenSidebarMutation>
          );
        }}
      </SidebarQuery>
    )}
  </EnsureTTI>
);

SidebarContainer.propTypes = {
  children: PropTypes.func.isRequired
};
