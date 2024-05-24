import { ComponentType } from 'react';
import styles from '@/globalStyle/styles/dynamic-link.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { IconComponent } from './IconComponent';
import { CategoryInterface } from '@/shared';
import { Box, Typography } from '@mui/material';
const cx = classNames.bind(styles);

const DynamicLink = ({
  icon,
  subIcon,
  locationValue,
  logo,
  onClick,
  to,
  href,
  width = 20,
  height = 20,
  flipIcon,
  children,
  hover,
  smember,
  mainMenu,
  filter,
  link,
  disabled,
  ...unknownProps
}: any) => {
  let Component: ComponentType<any> | string = 'button';
  const props: { [key: string]: any } = {
    onClick,
    disabled,
    ...unknownProps,
  };
  let style: any = {
    width: `${width}px`,
    height: `${height}px`,
  };
  if (to || link) {
    props['to'] = to;
    Component = NavLink;
  } else if (href) {
    props['href'] = href;
    Component = 'a';
  }
  const classes = cx('wrapper', {
    logo,
    icon,
    subIcon,
    flipIcon,
    hover,
    smember,
    mainMenu,
    filter,
    disabled,
  });

  if (mainMenu && typeof children === 'object') {
    const item: CategoryInterface = children;
    const newStyle = { ...style, color: 'black', width: 15 };
    return (
      <Component className={classes} {...props}>
        <Box display={'flex'} alignItems={'center'} fontSize={0.75}>
          <IconComponent iconName={item.icon} style={newStyle} />
          <Typography marginLeft={1} fontSize={12} fontWeight={'bold'}>
            {item.categoryName}
          </Typography>
        </Box>
        <Box sx={{ svg: { width: 0.625 } }}>
          <IconComponent iconName={subIcon} style={{ width: 10, height: 10, color: 'black' }} />
        </Box>
      </Component>
    );
  }

  if (subIcon && icon && locationValue) {
    return (
      <Component className={classes} {...props}>
        <IconComponent iconName={icon} style={style} />
        <div className={cx('box-content')}>
          <div className={cx('title')}>
            <div>{children}</div>
            <IconComponent iconName={subIcon} />
          </div>
          <div className={cx('location')}>{locationValue}</div>
        </div>
      </Component>
    );
  }

  if (icon) {
    return (
      <Component className={classes} {...props}>
        <IconComponent iconName={icon} style={style} />
        {children && <div>{children}</div>}
      </Component>
    );
  }

  return (
    <Component className={classes} {...props}>
      {children && children}
    </Component>
  );
};

export default DynamicLink;
