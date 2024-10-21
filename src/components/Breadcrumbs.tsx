import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    ...pathnames.map((name, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      return { label: name.charAt(0).toUpperCase() + name.slice(1), path };
    }),
  ];

  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex" itemScope itemType="https://schema.org/BreadcrumbList">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.path}
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && <ChevronRight size={16} className="mx-2" />}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-500" itemProp="name">{breadcrumb.label}</span>
            ) : (
              <Link to={breadcrumb.path} className="text-blue-600 hover:underline" itemProp="item">
                <span itemProp="name">{breadcrumb.label}</span>
              </Link>
            )}
            <meta itemProp="position" content={`${index + 1}`} />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;