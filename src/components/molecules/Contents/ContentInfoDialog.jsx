import React from "react";
import Dialog from "../../atoms/Dialog";
import LoadingModal from "../../atoms/LoadingModal";
import { Star, Clock, Calendar, Globe, Film } from "lucide-react";
import Badge from "../../atoms/Badge";

const ContentInfoDialog = ({
  isOpen,
  onClose,
  contentTitle,
  contentInfo,
  isLoading,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={
        contentTitle !== ""
          ? contentTitle
          : contentInfo?.Title || "Información del contenido"
      }
      description="Información acerca del contenido obtenida de OMDb API"
    >
      <div>
        {/* Verifica si está cargando */}
        {isLoading ? (
          <LoadingModal
            isLoading={isLoading}
            message="Cargando información del contenido..."
            overlay={false}
          />
        ) : contentInfo ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-h-[400px] overflow-auto">
            <div className="sm:col-span-1">
              <img
                src={contentInfo.Poster}
                alt={contentInfo.Title}
                className="w-full sm:h-auto min-h-min object-cover rounded-md shadow-lg"
              />
            </div>
            <div className="sm:col-span-2 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">
                  {contentInfo.Type
                    ? contentInfo.Type.toUpperCase()
                    : "No disponible"}
                </Badge>
                <Badge variant="outline">
                  {contentInfo.Rated !== "N/A"
                    ? contentInfo.Rated
                    : "No disponible"}
                </Badge>
                <span className="flex items-center text-yellow-500 gap-x-1">
                  <Badge variant="warning">
                    <Star className="w-4 h-4 mr-1" />
                    {contentInfo.imdbRating}
                  </Badge>
                  ({contentInfo.imdbVotes} votos)
                </span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Sinopsis</h3>
                <p className="text-sm text-gray-500">{contentInfo.Plot}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-6">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  {contentInfo.Runtime !== "N/A"
                    ? contentInfo.Runtime
                    : "No disponible"}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  {contentInfo.Released}
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-gray-400" />
                  <p className="text-sm">{contentInfo.Language}</p>
                </div>
                <div className="flex items-center">
                  <Film className="w-4 h-4 mr-2 text-gray-400" />
                  <p className="text-sm">{contentInfo.Genre}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Director</h3>
                  <p className="text-sm">
                    {contentInfo.Director !== "N/A"
                      ? contentInfo.Director
                      : "No disponible"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Cast</h3>
                  <p className="text-sm">{contentInfo.Actors}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Escritor</h3>
                  <p className="text-sm">
                    {contentInfo.Writer !== "N/A"
                      ? contentInfo.Writer
                      : "No disponible"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">País</h3>
                  <p className="text-sm">{contentInfo.Country}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Premios</h3>
                  <p className="text-sm">
                    {contentInfo.Awards !== "N/A"
                      ? contentInfo.Awards
                      : "No disponible"}
                  </p>
                </div>
                {contentInfo.Ratings && contentInfo.Ratings.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-1">Calificaciones:</h3>
                    <ul className="space-y-2 text-sm">
                      {contentInfo.Ratings.map((rating, index) => (
                        <li key={index}>
                          {rating.Source}: {rating.Value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {contentInfo.Type === "series" && (
                  <div>
                    <h3 className="font-semibold mb-1">Temporadas</h3>
                    <p className="text-sm">{contentInfo.totalSeasons}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>No se encontró información para este contenido.</p>
        )}
      </div>
    </Dialog>
  );
};

export default ContentInfoDialog;
