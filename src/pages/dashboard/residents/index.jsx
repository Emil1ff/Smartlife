import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Spinner,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

const data = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  fullName: `Sakin ${index + 1}`,
  phone: `050-000-${String(index + 1).padStart(2, "0")}`,
  email: `sakin${index + 1}@mail.com`,
  apartment: `Mənzil ${Math.floor(index / 2) + 1}`,
  status: index % 2 === 0 ? "Aktiv" : "Passiv",
}));

const ITEMS_PER_PAGE = 10;

const ResidentsPage = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const pageData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => setPage((prev) => Math.max(1, prev - 1));
  const handleNext = () => setPage((prev) => Math.min(totalPages, prev + 1));

  return (
    <div className="mt-12">
      <div className="w-full bg-black my-4 p-5 rounded-lg shadow-lg mb-6">
        <h3 className="text-white font-bold">Sakinlər</h3>
      </div>

      <Card className="border border-red-600 shadow-sm">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 flex items-center justify-between p-6"
        >
          {/* <Typography variant="h6" color="blue-gray" className="mb-1">
            Sakin Siyahısı
          </Typography> */}
          <div className="flex items-center gap-3">
            <Button variant="outlined" color="blue">
              Axtarış
            </Button>
            <Button color="green">Əlavə et</Button>
          </div>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Spinner className="h-6 w-6" />
              <Typography variant="small" className="mt-2 text-blue-gray-400">
                Yüklənir...
              </Typography>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full min-w-[720px] table-auto">
                  <thead>
                    <tr>
                      {["ID", "Ad Soyad", "Telefon", "Email", "Mənzil", "Status", "Əməliyyatlar"].map(
                        (el, idx) => (
                          <th
                            key={el}
                            className={`border-b border-red-600 py-3 px-6 text-left ${
                              idx === 6 ? "text-right" : ""
                            }`}
                          >
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium uppercase text-blue-gray-400"
                            >
                              {el}
                            </Typography>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.map((row, key) => {
                      const className = `py-3 px-6 ${
                        key === pageData.length - 1 ? "" : "border-b border-red-600"
                      }`;
                      return (
                        <tr key={row.id}>
                          <td className={className}>
                            <Typography variant="small" color="blue-gray">
                              {row.id}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {row.fullName}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" color="blue-gray">
                              {row.phone}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" color="blue-gray">
                              {row.email}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" color="blue-gray">
                              {row.apartment}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              color={row.status === "Aktiv" ? "green" : "red"}
                            >
                              {row.status}
                            </Typography>
                          </td>
                          <td className={`${className} text-right`}>
                            <Menu placement="left-start">
                              <MenuHandler>
                                <IconButton size="sm" variant="text" color="blue-gray">
                                  <EllipsisVerticalIcon
                                    strokeWidth={2}
                                    className="h-5 w-5"
                                  />
                                </IconButton>
                              </MenuHandler>
                              <MenuList>
                                <MenuItem>Bax</MenuItem>
                                <MenuItem>Düzəliş et</MenuItem>
                                <MenuItem>Sil</MenuItem>
                              </MenuList>
                            </Menu>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Tablet & mobile cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:hidden px-4 pt-4">
                {pageData.map((row) => (
                  <Card
                    key={row.id}
                    className="border border-blue-gray-100 shadow-sm"
                  >
                    <CardBody className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-[11px] font-medium uppercase"
                          >
                            Ad Soyad
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {row.fullName}
                          </Typography>
                        </div>
                        <Menu placement="left-start">
                          <MenuHandler>
                            <IconButton size="sm" variant="text" color="blue-gray">
                              <EllipsisVerticalIcon
                                strokeWidth={2}
                                className="h-5 w-5"
                              />
                            </IconButton>
                          </MenuHandler>
                          <MenuList>
                            <MenuItem>Bax</MenuItem>
                            <MenuItem>Düzəliş et</MenuItem>
                            <MenuItem>Sil</MenuItem>
                          </MenuList>
                        </Menu>
                      </div>

                      <div className="space-y-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-[11px] font-medium uppercase"
                        >
                          ID
                        </Typography>
                        <Typography variant="small" color="blue-gray">
                          {row.id}
                        </Typography>
                      </div>

                      <div className="space-y-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-[11px] font-medium uppercase"
                        >
                          Email
                        </Typography>
                        <Typography variant="small" color="blue-gray">
                          {row.email}
                        </Typography>
                      </div>

                      <div className="space-y-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-[11px] font-medium uppercase"
                        >
                          Telefon
                        </Typography>
                        <Typography variant="small" color="blue-gray">
                          {row.phone}
                        </Typography>
                      </div>

                      <div className="space-y-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-[11px] font-medium uppercase"
                        >
                          Mənzil
                        </Typography>
                        <Typography variant="small" color="blue-gray">
                          {row.apartment}
                        </Typography>
                      </div>

                      <div className="space-y-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-[11px] font-medium uppercase"
                        >
                          Status
                        </Typography>
                        <Typography
                          variant="small"
                          color={row.status === "Aktiv" ? "green" : "red"}
                          className="font-semibold"
                        >
                          {row.status}
                        </Typography>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 px-6 pt-4">
                <Button
                  variant="outlined"
                  size="sm"
                  color="blue-gray"
                  onClick={handlePrev}
                  disabled={page === 1}
                >
                  Geri
                </Button>
                <div className="rounded-md bg-blue-600 text-white text-sm px-3 py-1">
                  {page} / {totalPages}
                </div>
                <Button
                  variant="outlined"
                  size="sm"
                  color="blue-gray"
                  onClick={handleNext}
                  disabled={page === totalPages}
                >
                  İrəli
                </Button>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ResidentsPage;
